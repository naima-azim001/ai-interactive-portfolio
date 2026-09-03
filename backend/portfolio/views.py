import bleach
from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from .models import (
    Project, Skill, Publication, Research,
    TimelineItem, Education, ContactMessage
)
from .serializers import (
    ProjectSerializer, SkillSerializer, PublicationSerializer,
    ResearchSerializer, TimelineItemSerializer, EducationSerializer,
    ContactMessageSerializer, ChatMessageSerializer
)
from .rag.models import RAGService


class AIChatThrottle(AnonRateThrottle):
    scope = 'ai_chat'


class ContactThrottle(AnonRateThrottle):
    scope = 'contact'


@api_view(['GET'])
def project_list(request):
    projects = Project.objects.filter(approved=True)
    return Response(ProjectSerializer(projects, many=True).data)


@api_view(['GET'])
def project_detail(request, slug):
    project = Project.objects.filter(slug=slug, approved=True).first()
    if not project:
        return Response(
            {"error": "Project not found."},
            status=status.HTTP_404_NOT_FOUND,
        )
    return Response(ProjectSerializer(project).data)


@api_view(['GET'])
def skill_list(request):
    skills = Skill.objects.filter(approved=True)
    return Response(SkillSerializer(skills, many=True).data)


@api_view(['GET'])
def publication_list(request):
    pubs = Publication.objects.filter(approved=True)
    return Response(PublicationSerializer(pubs, many=True).data)


@api_view(['GET'])
def research_list(request):
    research = Research.objects.filter(approved=True)
    return Response(ResearchSerializer(research, many=True).data)


@api_view(['GET'])
def timeline_list(request):
    items = TimelineItem.objects.filter(approved=True)
    return Response(TimelineItemSerializer(items, many=True).data)


@api_view(['GET'])
def education_list(request):
    education = Education.objects.filter(approved=True)
    return Response(EducationSerializer(education, many=True).data)


@api_view(['POST'])
@throttle_classes([AIChatThrottle])
def ai_chat(request):
    serializer = ChatMessageSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    message = serializer.validated_data['message']
    message = bleach.clean(message, tags=[], strip=True)
    if not message:
        return Response(
            {"error": "Message cannot be empty."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        rag_service = RAGService()
        answer = rag_service.chat(message)
        return Response({"answer": answer})
    except RuntimeError as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )
    except Exception as e:
        return Response(
            {"error": "An unexpected error occurred."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(['POST'])
@throttle_classes([ContactThrottle])
def contact_submit(request):
    serializer = ContactMessageSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    try:
        serializer.save()
        return Response(
            {"message": "Your message has been sent successfully."},
            status=status.HTTP_201_CREATED,
        )
    except Exception:
        return Response(
            {"error": "An unexpected error occurred."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
