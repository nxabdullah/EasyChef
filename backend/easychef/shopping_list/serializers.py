from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import ShoppingItem
from recipes.models import Recipe
from rest_framework.reverse import reverse


class RecipeSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Recipe
        fields = ('id', 'name', 'url')

    def get_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(reverse('recipes:view-edit-delete-recipe', args=[obj.pk]))


class ShoppingItemSerializer(serializers.ModelSerializer):
    # used for get
    recipe = RecipeSerializer(read_only=True)

    # used for creation
    recipe_id = serializers.PrimaryKeyRelatedField(
        queryset=Recipe.objects.all(),
        source='recipe',
        write_only=True
    )

    class Meta:
        model = ShoppingItem
        fields = ['recipe_id', 'recipe', 'serving_size']


class ShoppingIngredientsSerializer(serializers.Serializer):
    name = serializers.CharField()
    quantity = serializers.FloatField()
