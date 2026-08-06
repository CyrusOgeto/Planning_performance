from django.db import migrations, models
import django.db.models.deletion


def map_legacy_sub_activities(apps, schema_editor):
    ActivityIndicator = apps.get_model("projects", "ActivityIndicator")
    for indicator in ActivityIndicator.objects.exclude(sub_activity_id=None).select_related("sub_activity"):
        indicator.main_activity_id = indicator.sub_activity.main_activity_id
        indicator.save(update_fields=["main_activity"])


class Migration(migrations.Migration):
    dependencies = [("projects", "0017_activityindicator_project_output")]

    operations = [
        migrations.AddField(
            model_name="activityindicator",
            name="main_activity",
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="activity_indicators", to="projects.mainactivity"),
        ),
        migrations.RunPython(map_legacy_sub_activities, migrations.RunPython.noop),
    ]
