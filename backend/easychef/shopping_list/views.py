from django.shortcuts import render
from rest_framework import pagination, permissions, status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import generics, pagination

from .models import ShoppingItem
from .serializers import ShoppingIngredientsSerializer, ShoppingItemSerializer


# view, add or delete recipes in the shopping list
from recipes.models import Recipe


class ShoppingListRecipeView(generics.GenericAPIView):
    """
    url: /shopping_list/recipes/<int:rid>

    returns the serving size for the given recipe id
    or null if recipe not in shopping list
    """
    permission_classes = [permissions.IsAuthenticated]
    queryset = ShoppingItem.objects.all()

    def get(self, request, rid, *args, **kwargs):
        # Get the logged-in user
        user = request.user

        # Get the shopping item associated with the user and the given recipe id
        shopping_item = self.queryset.filter(user=user, recipe__id=rid).first()

        if shopping_item:
            # If the shopping item exists, return the serving size
            data = {'serving_size': shopping_item.serving_size}
            return Response(data, status=status.HTTP_200_OK)
        else:
            # If the shopping item does not exist, return null
            data = {'serving_size': None}
            return Response(data, status=status.HTTP_200_OK)

class ShoppingListAPIView(ListAPIView):
    """
    url: /shopping_list/recipes
    """
    permission_classes = [permissions.IsAuthenticated]
    queryset = ShoppingItem.objects.all()
    serializer_class = ShoppingItemSerializer

    def put(self, request):
        data = request.data
        recipe_id = data.get('recipe_id')
        serving_size = data.get('serving_size')

        if not recipe_id or not serving_size:
            return Response(
                {'error': 'recipe_id and serving_size are required'},
                status=status.HTTP_400_BAD_REQUEST)

        # verify recipe exists
        try:
            Recipe.objects.get(pk=recipe_id)
        except Recipe.DoesNotExist:
            return Response({"detail": "Recipe not found with the given pk."},
                            status=status.HTTP_404_NOT_FOUND)

        shopping_item = ShoppingItem.objects.filter(user=request.user,
                                                    recipe_id=recipe_id).first()

        if not shopping_item:
            shopping_item = ShoppingItem(user=request.user, recipe_id=recipe_id)

        shopping_item.serving_size = serving_size
        shopping_item.save()

        serializer = ShoppingItemSerializer(shopping_item)

        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset().filter(user=request.user))
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ShoppingIngredientsAPIView(generics.ListAPIView):
    """
    url: GET /shopping_list
    """
    permission_classes = [permissions.IsAuthenticated]
    queryset = ShoppingItem.objects.all()
    serializer_class = ShoppingIngredientsSerializer
    pagination_class = pagination.PageNumberPagination

    def get_queryset(self):
        return ShoppingItem.objects.filter(user=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        shopping_list = self.build_shopping_list(queryset)

        # Paginate the shopping list
        page = self.paginate_queryset(shopping_list)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(shopping_list, many=True)
        return Response(serializer.data)

    def build_shopping_list(self, shoppingItems):
        shopping_list = []

        for item in shoppingItems:
            ingredients = item.recipe.get_ingredients_list()
            original_serving = item.recipe.serving_size
            new_serving = item.serving_size

            ratio = new_serving / original_serving

            for ingredient in ingredients:

                # find other ingredients with same name in shopping_list
                existing_ingredient = next(
                    (i for i in shopping_list if i['name'] == ingredient['name']),
                    None)

                if existing_ingredient is None:
                    shopping_list.append({
                        'name': ingredient['name'],
                        'quantity': float(ingredient['quantity']) * ratio
                    })

                else:
                    existing_ingredient['quantity'] += float(
                        ingredient['quantity']) * ratio

        return shopping_list
