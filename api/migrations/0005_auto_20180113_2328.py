# Generated by Django 2.0.1 on 2018-01-13 23:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20180109_0402'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='message',
            options={'ordering': [], 'verbose_name': 'Mensagem', 'verbose_name_plural': 'Mensagens'},
        ),
        migrations.AlterField(
            model_name='message',
            name='action',
            field=models.CharField(blank=True, max_length=25, null=True, verbose_name='Ação'),
        ),
    ]
