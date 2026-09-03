from django.urls import path
from . import views

urlpatterns = [
    path('projects/', views.project_list, name='project-list'),
    path('projects/<slug:slug>/', views.project_detail, name='project-detail'),
    path('skills/', views.skill_list, name='skill-list'),
    path('publications/', views.publication_list, name='publication-list'),
    path('research/', views.research_list, name='research-list'),
    path('timeline/', views.timeline_list, name='timeline-list'),
    path('education/', views.education_list, name='education-list'),
    path('ai/chat/', views.ai_chat, name='ai-chat'),
    path('contact/', views.contact_submit, name='contact-submit'),
]
