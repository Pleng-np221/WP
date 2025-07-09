from datetime import datetime
from django.shortcuts import render
from django.http import HttpResponse
from .models import Question, Choice

def index(request):
    latest_question_list = Question.objects.order_by("-pub_date")[:5]
    context = {
        "page_title" : "Latest 5 questions",
        "questions": latest_question_list,
        "current_date" : datetime.now().strftime("%d/%m/%Y, %H:%M:%S")
        }
    return render(request, "index.html", context)

def detail(request, question_id):
    question = Question.objects.get(pk=question_id)
    choices = Choice.objects.filter(question_id=question)
    context = {
        "question": question,
        "choices" : choices
        }
    return render(request, "detail.html", context)

def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)


def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)