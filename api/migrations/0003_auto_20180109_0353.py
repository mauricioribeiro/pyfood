# Generated by Django 2.0.1 on 2018-01-09 03:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_product'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='client',
            name='token_type',
        ),
        migrations.AddField(
            model_name='client',
            name='source',
            field=models.CharField(choices=[('FACEBOOK', 'Facebook'), ('EMBED', 'Web')], default='FACEBOOK', max_length=100, verbose_name='Plataforma'),
        ),
    ]
