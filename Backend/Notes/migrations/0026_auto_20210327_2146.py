# Generated by Django 3.1.7 on 2021-03-27 12:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Notes', '0025_auto_20210327_2138'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='note',
            name='month',
        ),
        migrations.RemoveField(
            model_name='note',
            name='year',
        ),
        migrations.AddField(
            model_name='note',
            name='vol',
            field=models.IntegerField(default=202103),
            preserve_default=False,
        ),
    ]
