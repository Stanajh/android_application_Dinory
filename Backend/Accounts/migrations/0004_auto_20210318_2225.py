# Generated by Django 3.1.7 on 2021-03-18 13:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Accounts', '0003_auto_20210318_1854'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='pin_code',
            field=models.CharField(default='000000', max_length=6),
        ),
    ]