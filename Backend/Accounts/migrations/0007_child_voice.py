# Generated by Django 3.1.7 on 2021-03-25 00:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Accounts', '0006_auto_20210323_1626'),
    ]

    operations = [
        migrations.AddField(
            model_name='child',
            name='voice',
            field=models.IntegerField(default=0),
        ),
    ]
