import hashlib
from django.core.management.base import BaseCommand
from portfolio.models import (
    Project, Skill, Publication, Research,
    TimelineItem, Education, PortfolioDocument
)
from portfolio.rag.embeddings import EmbeddingService


class Command(BaseCommand):
    help = 'Build embeddings for all approved portfolio content'

    def handle(self, *args, **options):
        service = EmbeddingService()
        created = 0
        skipped = 0

        content_items = []

        for project in Project.objects.filter(approved=True):
            text = f"Project: {project.title}. Description: {project.description} {project.long_description}. Technologies: {', '.join(project.technologies)}."
            content_items.append(('project', project.id, text))

        for skill in Skill.objects.filter(approved=True):
            text = f"Skill: {skill.name} in category {skill.category}."
            content_items.append(('skill', skill.id, text))

        for pub in Publication.objects.filter(approved=True):
            text = f"Publication: {pub.title} by {pub.authors}, published in {pub.venue}, {pub.year}. Abstract: {pub.abstract}"
            content_items.append(('publication', pub.id, text))

        for res in Research.objects.filter(approved=True):
            text = f"Research: {res.title}. {res.description} Methodology: {res.methodology} Technologies: {', '.join(res.technologies)}. Status: {res.status}"
            content_items.append(('research', res.id, text))

        for item in TimelineItem.objects.filter(approved=True):
            text = f"Timeline: {item.title} at {item.organization}. {item.description}"
            content_items.append(('timeline', item.id, text))

        for edu in Education.objects.filter(approved=True):
            text = f"Education: {edu.degree} in {edu.field} from {edu.institution}. Grade: {edu.grade}. {edu.description}"
            content_items.append(('education', edu.id, text))

        for source_type, source_id, content in content_items:
            content_hash = hashlib.md5(content.encode()).hexdigest()

            existing = PortfolioDocument.objects.filter(
                source_type=source_type, source_id=source_id
            ).first()

            if existing and existing.content == content:
                skipped += 1
                continue

            try:
                self.stdout.write(f"  Embedding {source_type} #{source_id}...")
                embedding = service.create_embedding(content)

                if existing:
                    existing.content = content
                    existing.embedding = service.serialize(embedding)
                    existing.approved = True
                    existing.save()
                else:
                    PortfolioDocument.objects.create(
                        content=content,
                        source_type=source_type,
                        source_id=source_id,
                        embedding=service.serialize(embedding),
                        approved=True,
                    )
                created += 1
            except Exception as e:
                self.stderr.write(f"  ERROR embedding {source_type} #{source_id}: {e}")

        # Remove documents whose source was deleted or unapproved
        valid_pairs = set((s, i) for s, i, _ in content_items)
        PortfolioDocument.objects.filter(
            approved=True
        ).exclude(
            source_type__in=['project', 'skill', 'publication', 'research', 'timeline', 'education']
        ).delete()

        self.stdout.write(self.style.SUCCESS(
            f"Done. Created {created} embeddings, skipped {skipped} unchanged."
        ))
