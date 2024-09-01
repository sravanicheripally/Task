from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    user = serializers.CharField()  # Accept username as a string

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'creation_date', 'status', 'user']

    def create(self, validated_data):
        username = validated_data.pop('user')
        user = User.objects.filter(username=username).first()
        if not user:
            raise serializers.ValidationError({'user': 'User does not exist.'})
        validated_data['user'] = user
        return super().create(validated_data)


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user
