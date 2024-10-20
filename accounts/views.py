from django.shortcuts import render


#login signup
def signup_view(request):

    if request.POST:
        print("post request recieved!!!")


    return render(request,'accounts/signup.html')

def signin_view(request):
    return render(request, 'accounts/login.html')

