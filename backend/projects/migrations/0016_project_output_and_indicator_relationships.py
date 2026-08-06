from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [("projects", "0015_subactivity_value_chains")]

    operations = [
        migrations.CreateModel(
            name="ProjectOutput",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=500)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("sub_component", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="project_outputs", to="projects.projectsubcomponent")),
            ],
            options={"ordering": ["sub_component__name", "name"], "verbose_name": "Project Output", "verbose_name_plural": "Project Outputs", "unique_together": {("sub_component", "name")}},
        ),
        migrations.AddField(model_name="mainactivity", name="project_output", field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="main_activities", to="projects.projectoutput")),
        migrations.AddField(model_name="activityindicator", name="sub_component", field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="activity_indicators", to="projects.projectsubcomponent")),
        migrations.AlterField(model_name="activityindicator", name="sub_activity", field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name="activity_indicators", to="projects.subactivity")),
        migrations.AlterField(model_name="activityindicator", name="target", field=models.CharField(blank=True, max_length=500)),
        migrations.AlterField(model_name="activityindicator", name="unit_of_measure", field=models.CharField(blank=True, max_length=120)),
    ]
