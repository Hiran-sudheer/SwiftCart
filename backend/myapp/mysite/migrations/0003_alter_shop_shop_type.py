# Generated by Django 4.2.5 on 2024-01-24 10:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mysite', '0002_customuser_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shop',
            name='shop_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mysite.shoptype'),
        ),
    ]