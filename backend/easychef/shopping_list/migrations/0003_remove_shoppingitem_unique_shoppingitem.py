# Generated by Django 4.1.7 on 2023-03-16 20:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shopping_list', '0002_shoppingitem_unique_shoppingitem'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='shoppingitem',
            name='unique_shoppingitem',
        ),
    ]
