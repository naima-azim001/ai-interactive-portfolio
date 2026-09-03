from django.contrib import admin
from .models import (
    Project, Skill, Publication, Research,
    TimelineItem, Education, PortfolioDocument, ContactMessage
)


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'featured', 'approved', 'start_date', 'end_date')
    list_filter = ('featured', 'approved')
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('approved', 'featured')


class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency', 'approved')
    list_filter = ('category', 'approved')
    search_fields = ('name',)
    list_editable = ('approved',)


class PublicationAdmin(admin.ModelAdmin):
    list_display = ('title', 'year', 'venue', 'approved')
    list_filter = ('approved', 'year')
    search_fields = ('title', 'authors')
    list_editable = ('approved',)


class ResearchAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'approved')
    list_filter = ('status', 'approved')
    search_fields = ('title', 'description')
    list_editable = ('approved',)


class TimelineItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'organization', 'item_type', 'start_date', 'approved')
    list_filter = ('item_type', 'approved')
    search_fields = ('title', 'organization')
    list_editable = ('approved',)


class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree', 'institution', 'field', 'grade', 'approved')
    list_filter = ('approved',)
    search_fields = ('degree', 'institution')
    list_editable = ('approved',)


class PortfolioDocumentAdmin(admin.ModelAdmin):
    list_display = ('source_type', 'source_id', 'approved', 'created_at')
    list_filter = ('source_type', 'approved')
    list_editable = ('approved',)


class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'read', 'created_at')
    list_filter = ('read',)
    search_fields = ('name', 'email', 'subject')
    list_editable = ('read',)


admin.site.register(Project, ProjectAdmin)
admin.site.register(Skill, SkillAdmin)
admin.site.register(Publication, PublicationAdmin)
admin.site.register(Research, ResearchAdmin)
admin.site.register(TimelineItem, TimelineItemAdmin)
admin.site.register(Education, EducationAdmin)
admin.site.register(PortfolioDocument, PortfolioDocumentAdmin)
admin.site.register(ContactMessage, ContactMessageAdmin)
