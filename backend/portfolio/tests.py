from django.test import TestCase, override_settings
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import (
    Project, Skill, Publication, Research,
    TimelineItem, Education, ContactMessage
)


@override_settings(
    REST_FRAMEWORK={
        'DEFAULT_THROTTLE_RATES': {
            'anon': '1000/hour',
        }
    }
)
class BaseTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        from django.core.cache import cache
        cache.clear()


class PortfolioContentTests(BaseTestCase):
    def setUp(self):
        super().setUp()
        self.approved_project = Project.objects.create(
            title='Approved Project',
            slug='approved-project',
            description='An approved project.',
            technologies=['Python'],
            featured=True,
            approved=True,
        )
        self.unapproved_project = Project.objects.create(
            title='Hidden Project',
            slug='hidden-project',
            description='Should not be visible.',
            technologies=['Python'],
            approved=False,
        )

    def test_project_list_returns_only_approved(self):
        response = self.client.get(reverse('project-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Approved Project')

    def test_project_detail_approved(self):
        response = self.client.get(reverse('project-detail', args=['approved-project']))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Approved Project')

    def test_project_detail_hides_unapproved(self):
        response = self.client.get(reverse('project-detail', args=['hidden-project']))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_project_detail_missing_returns_404(self):
        response = self.client.get(reverse('project-detail', args=['does-not-exist']))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_skill_list_returns_approved(self):
        Skill.objects.create(name='Python', category='Programming', approved=True)
        Skill.objects.create(name='Secret', category='Programming', approved=False)
        response = self.client.get(reverse('skill-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class ContactTests(BaseTestCase):
    def test_contact_validation(self):
        response = self.client.post(reverse('contact-submit'), {
            'name': '',
            'email': 'not-an-email',
            'subject': '',
            'message': '',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_contact_valid_submission(self):
        response = self.client.post(reverse('contact-submit'), {
            'name': 'John Doe',
            'email': 'john@example.com',
            'subject': 'Hello',
            'message': 'This is a test message.',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 1)

    def test_contact_empty_message(self):
        response = self.client.post(reverse('contact-submit'), {
            'name': 'John',
            'email': 'john@example.com',
            'subject': 'Test',
            'message': '   ',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class AIChatTests(BaseTestCase):
    def test_chat_validation_empty(self):
        response = self.client.post(reverse('ai-chat'), {'message': ''}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_chat_validation_too_long(self):
        response = self.client.post(reverse('ai-chat'), {'message': 'x' * 600}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_chat_missing_field(self):
        response = self.client.post(reverse('ai-chat'), {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class RAGRetrievalTests(BaseTestCase):
    def test_rag_returns_graceful_message_when_no_embeddings(self):
        response = self.client.post(reverse('ai-chat'), {'message': 'Test question'}, format='json')
        self.assertIn(response.status_code, [status.HTTP_200_OK, status.HTTP_503_SERVICE_UNAVAILABLE])


class EmptyPortfolioTests(BaseTestCase):
    def test_empty_skills(self):
        response = self.client.get(reverse('skill-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)
