from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django_recaptcha.fields import ReCaptchaField

#remove after all languages are complete
# class SignupForm(UserCreationForm):
#     username = forms.CharField(max_length=200, help_text='Required. 150 characters or fewer. Letters, digits and @ . + - _ only.')
#     email = forms.EmailField(max_length=200, help_text='Required. English')
#     password1 = forms.PasswordInput()
#     password2 = forms.PasswordInput()
  
#     class Meta:
#         model = User
#         fields = ('username', 'email', 'password1', 'password2')

# class LoginForm(forms.Form):
#     username = forms.CharField()
#     password = forms.CharField(widget=forms.PasswordInput)    
#end of removal

#core
class SignupForm_core(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. English')
    email = forms.EmailField(max_length=200, help_text='Required. English')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='Your password can’t be too similar to your other personal information.<br>Your password must contain at least 8 characters.<br>Your password can’t be a commonly used password.<br>Your password can’t be entirely numeric.<br>English')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='Enter the same password as before, for verification. English')
    recaptcha = ReCaptchaField(label='')
    # recaptcha.widget.api_params["hl"] = "fr"

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2','recaptcha')

class LoginForm_core(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)    

#ar
class SignupForm_ar(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='اسم المستخدم (مطلوب. 150 حرفًا أو أقل. الحروف والأرقام و@ . + - _ فقط.')
    email = forms.EmailField(max_length=200, help_text='البريد الإلكتروني (مطلوب.')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، ولا يمكن أن تكون مشابهة لاسم المستخدم، أو كلمة مرور شائعة الاستخدام، ولا يمكن أن تكون رقمية بالكامل.')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='أدخل نفس كلمة المرور كما كان من قبل، للتحقق.')
    recaptcha = ReCaptchaField(label='')
    recaptcha.widget.api_params["hl"] = "ar"
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2','recaptcha')

class LoginForm_ar(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput) 

 #bengali
class SignupForm_bn(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='ব্যবহারকারীর নাম (বাধ্যতামূলক. 150 অক্ষর বা তার কম। অক্ষর, অঙ্ক এবং @। + - _ শুধুমাত্র।')
    email = forms.EmailField(max_length=200, help_text='ই - মেইল ​​(আবশ্যক.')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='পাসওয়ার্ডে কমপক্ষে 8টি অক্ষর থাকতে হবে, ব্যবহারকারীর নামের অনুরূপ হতে পারে না বা একটি সাধারণভাবে ব্যবহৃত পাসওয়ার্ড এবং সম্পূর্ণ সংখ্যাসূচক হতে পারে না।')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='যাচাইয়ের জন্য আগের মতোই পাসওয়ার্ড দিন।')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_bn(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)                          

#de
class SignupForm_de(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='Benutzername erforderlich. 150 Zeichen oder weniger. Buchstaben, Ziffern und @ . + - _ nur.')
    email = forms.EmailField(max_length=200, help_text='Email (erforderlich.')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='Das Passwort muss mindestens 8 Zeichen enthalten, darf nicht einem Benutzernamen oder einem häufig verwendeten Passwort ähneln und darf nicht vollständig numerisch sein.')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='Geben Sie zur Verifizierung das gleiche Passwort wie zuvor ein.')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_de(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)    

#dede
class SignupForm_dede(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='Benutzername erforderlich. 150 Zeichen oder weniger. Buchstaben, Ziffern und @ . + - _ nur.')
    email = forms.EmailField(max_length=200, help_text='Email (erforderlich.')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='Das Passwort muss mindestens 8 Zeichen enthalten, darf nicht einem Benutzernamen oder einem häufig verwendeten Passwort ähneln und darf nicht vollständig numerisch sein.')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='Geben Sie zur Verifizierung das gleiche Passwort wie zuvor ein.')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_dede(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)  

#en
class SignupForm_en(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='Username Required. 150 characters or fewer. Letters, digits and @ . + - _ only.')
    email = forms.EmailField(max_length=200, help_text='Email Required.')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='Password must contain at least 8 characters, can’t be similar to username, or a commonly used password, and can’t be entirely numeric.')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='Enter the same password as before, for verification.')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_en(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)  

#engb
class SignupForm_engb(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='Username Required. 150 characters or fewer. Letters, digits and @ . + - _ only.')
    email = forms.EmailField(max_length=200, help_text='Email Required.')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='Password must contain at least 8 characters, can’t be similar to username, or a commonly used password, and can’t be entirely numeric.')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='Enter the same password as before, for verification.')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_engb(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)

#enin
class SignupForm_enin(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='Username Required. 150 characters or fewer. Letters, digits and @ . + - _ only.')
    email = forms.EmailField(max_length=200, help_text='Email Required.')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='Password must contain at least 8 characters, can’t be similar to username, or a commonly used password, and can’t be entirely numeric.')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='Enter the same password as before, for verification.')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_enin(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)

#es
class SignupForm_es(UserCreationForm):
    username = forms.CharField(max_length=200, label='Nombre de usuario', help_text='Nombre de usuario (requerido. 150 caracteres o menos. Letras, dígitos y @ . + - _ solamente.')
    email = forms.EmailField(max_length=200, label='Correo electronico', help_text='Correo electronico (requerido.')
    password1 = forms.CharField(widget=forms.PasswordInput, label='Contraseña', help_text='La contraseña debe contener al menos 8 caracteres, no puede ser similar a un nombre de usuario ni a una contraseña de uso común y no puede ser completamente numérica.')
    password2 = forms.CharField(widget=forms.PasswordInput, label='Repita la contraseña', help_text='Ingrese la misma contraseña que antes, para verificación.')
    recaptcha = ReCaptchaField(label='')
    recaptcha.widget.api_params["hl"] = "es"
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2', 'recaptcha')

class LoginForm_es(forms.Form):
    username = forms.CharField(label='Nombre de usuario')
    password = forms.CharField(widget=forms.PasswordInput, label='Contraseña') 
     

#esar
class SignupForm_esar(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='Nombre de usuario (requerido. 150 caracteres o menos. Letras, dígitos y @ . + - _ solamente.')
    email = forms.EmailField(max_length=200, help_text='Correo electronico (requerido.')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='La contraseña debe contener al menos 8 caracteres, no puede ser similar a un nombre de usuario ni a una contraseña de uso común y no puede ser completamente numérica.')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='Ingrese la misma contraseña que antes, para verificación.')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_esar(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)

#esco
class SignupForm_esco(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='Nombre de usuario (requerido. 150 caracteres o menos. Letras, dígitos y @ . + - _ solamente.')
    email = forms.EmailField(max_length=200, help_text='Correo electronico (requerido.')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='La contraseña debe contener al menos 8 caracteres, no puede ser similar a un nombre de usuario ni a una contraseña de uso común y no puede ser completamente numérica.')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='Ingrese la misma contraseña que antes, para verificación.')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_esco(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput) 

#eses
class SignupForm_eses(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='Nombre de usuario (requerido. 150 caracteres o menos. Letras, dígitos y @ . + - _ solamente.')
    email = forms.EmailField(max_length=200, help_text='Correo electronico (requerido.')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='La contraseña debe contener al menos 8 caracteres, no puede ser similar a un nombre de usuario ni a una contraseña de uso común y no puede ser completamente numérica.')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='Ingrese la misma contraseña que antes, para verificación.')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_eses(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput) 

#esmx
class SignupForm_esmx(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='Nombre de usuario (requerido. 150 caracteres o menos. Letras, dígitos y @ . + - _ solamente.')
    email = forms.EmailField(max_length=200, help_text='Correo electronico (requerido.')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='La contraseña debe contener al menos 8 caracteres, no puede ser similar a un nombre de usuario ni a una contraseña de uso común y no puede ser completamente numérica.')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='Ingrese la misma contraseña que antes, para verificación.')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_esmx(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)

#espe
class SignupForm_espe(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='Nombre de usuario (requerido. 150 caracteres o menos. Letras, dígitos y @ . + - _ solamente.')
    email = forms.EmailField(max_length=200, help_text='Correo electronico (requerido.')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='La contraseña debe contener al menos 8 caracteres, no puede ser similar a un nombre de usuario ni a una contraseña de uso común y no puede ser completamente numérica.')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='Ingrese la misma contraseña que antes, para verificación.')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_espe(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput) 

#esve
class SignupForm_esve(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='Nombre de usuario (requerido. 150 caracteres o menos. Letras, dígitos y @ . + - _ solamente.')
    email = forms.EmailField(max_length=200, help_text='Correo electronico (requerido.')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='La contraseña debe contener al menos 8 caracteres, no puede ser similar a un nombre de usuario ni a una contraseña de uso común y no puede ser completamente numérica.')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='Ingrese la misma contraseña que antes, para verificación.')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_esve(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)

#fr
class SignupForm_fr(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='Nom d utilisateur (requis. 150 caractères ou moins. Lettres, chiffres et @ . + - _ seulement.')
    email = forms.EmailField(max_length=200, help_text='Email (requis.')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='Le mot de passe doit contenir au moins 8 caractères, ne peut pas être similaire au nom d utilisateur ou à un mot de passe couramment utilisé, et ne peut pas être entièrement numérique.')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='Entrez le même mot de passe que précédemment, pour vérification.')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_fr(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)  

#frca
class SignupForm_frca(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='Nom d utilisateur (requis. 150 caractères ou moins. Lettres, chiffres et @ . + - _ seulement.')
    email = forms.EmailField(max_length=200, help_text='Email (requis.')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='Le mot de passe doit contenir au moins 8 caractères, ne peut pas être similaire au nom d utilisateur ou à un mot de passe couramment utilisé, et ne peut pas être entièrement numérique.')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='Entrez le même mot de passe que précédemment, pour vérification.')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_frca(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput) 

#frfr
class SignupForm_frfr(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='Nom d utilisateur (requis. 150 caractères ou moins. Lettres, chiffres et @ . + - _ seulement.')
    email = forms.EmailField(max_length=200, help_text='Email (requis.')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='Le mot de passe doit contenir au moins 8 caractères, ne peut pas être similaire au nom d utilisateur ou à un mot de passe couramment utilisé, et ne peut pas être entièrement numérique.')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='Entrez le même mot de passe que précédemment, pour vérification.')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_frfr(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)       

#hi
class SignupForm_hi(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='उपयोगकर्ता का नाम (आवश्यक। 150 अक्षर या उससे कम. अक्षर, अंक और @. + - _ केवल.')
    email = forms.EmailField(max_length=200, help_text='ईमेल (अनिवार्य।')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='पासवर्ड में कम से कम 8 अक्षर होने चाहिए, यह उपयोगकर्ता नाम या आमतौर पर उपयोग किए जाने वाले पासवर्ड के समान नहीं हो सकता है, और पूरी तरह से संख्यात्मक नहीं हो सकता है।')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='सत्यापन के लिए पहले जैसा ही पासवर्ड दर्ज करें।')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_hi(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput) 

#hiin
class SignupForm_hiin(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='उपयोगकर्ता का नाम (आवश्यक। 150 अक्षर या उससे कम. अक्षर, अंक और @. + - _ केवल.')
    email = forms.EmailField(max_length=200, help_text='ईमेल (अनिवार्य।')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='पासवर्ड में कम से कम 8 अक्षर होने चाहिए, यह उपयोगकर्ता नाम या आमतौर पर उपयोग किए जाने वाले पासवर्ड के समान नहीं हो सकता है, और पूरी तरह से संख्यात्मक नहीं हो सकता है।')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='सत्यापन के लिए पहले जैसा ही पासवर्ड दर्ज करें।')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_hiin(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput) 

#idid
class SignupForm_idid(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='Nama Pengguna Diperlukan. 150 karakter atau kurang. Huruf, angka dan @ . + - _ saja.')
    email = forms.EmailField(max_length=200, help_text='Email Diperlukan.')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='Kata sandi harus berisi minimal 8 karakter, tidak boleh mirip dengan nama pengguna, atau kata sandi yang umum digunakan, dan tidak boleh seluruhnya berupa angka.')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='Masukkan kata sandi yang sama seperti sebelumnya, untuk verifikasi.')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_idid(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)

#jajp
class SignupForm_jajp(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='ユーザー名は必須です。 150 文字以内。 文字、数字、@ 。 + - _ のみ。')
    email = forms.EmailField(max_length=200, help_text='メールアドレスは必須です。')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='パスワードには少なくとも 8 文字を含める必要があり、ユーザー名や一般的に使用されるパスワードと同じにすることはできません。また、完全に数字にすることはできません。')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='確認のため、以前と同じパスワードを入力します。')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_jajp(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)

#ko
class SignupForm_ko(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='사용자 이름이 필요합니다. 150자 이하입니다. 문자, 숫자 및 @ . + - _만.')
    email = forms.EmailField(max_length=200, help_text='이메일 필수.')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='비밀번호는 8자 이상이어야 하며 사용자 이름 또는 일반적으로 사용되는 비밀번호와 유사할 수 없으며 전체가 숫자일 수 없습니다.')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='확인을 위해 이전과 동일한 비밀번호를 입력하세요.')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_ko(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)

#pptt
class SignupForm_pptt(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='Nome de usuário (necessário. 150 caracteres ou menos. Letras, dígitos e @ . + - _ apenas.')
    email = forms.EmailField(max_length=200, help_text='Email (obrigatório.')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='A senha deve conter pelo menos 8 caracteres, não pode ser semelhante ao nome de usuário ou a uma senha comumente usada e não pode ser totalmente numérica.')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='Digite a mesma senha de antes, para verificação.')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_pptt(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)  

#pt
class SignupForm_pt(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='Nome de usuário (necessário. 150 caracteres ou menos. Letras, dígitos e @ . + - _ apenas.')
    email = forms.EmailField(max_length=200, help_text='Email (obrigatório.')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='A senha deve conter pelo menos 8 caracteres, não pode ser semelhante ao nome de usuário ou a uma senha comumente usada e não pode ser totalmente numérica.')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='Digite a mesma senha de antes, para verificação.')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_pt(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)   

#ptbr
class SignupForm_ptbr(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='Nome de usuário (necessário. 150 caracteres ou menos. Letras, dígitos e @ . + - _ apenas.')
    email = forms.EmailField(max_length=200, help_text='Email (obrigatório.')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='A senha deve conter pelo menos 8 caracteres, não pode ser semelhante ao nome de usuário ou a uma senha comumente usada e não pode ser totalmente numérica.')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='Digite a mesma senha de antes, para verificação.')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_ptbr(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)  

#ru
class SignupForm_ru(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='Требуется имя пользователя. 150 символов или меньше. Буквы, цифры и @. + - _ только.')
    email = forms.EmailField(max_length=200, help_text='Требуется электронная почта.')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='Пароль должен содержать не менее 8 символов, не может быть похож на имя пользователя или часто используемый пароль и не может быть полностью числовым.')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='Введите тот же пароль, что и раньше, для проверки.')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_ru(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)

#ur
class SignupForm_ur(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='صارف نام درکار ہے۔ 150 حروف یا اس سے کم۔ حروف، ہندسے اور @۔ + - _ صرف۔')
    email = forms.EmailField(max_length=200, help_text='ای میل درکار ہے۔')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='پاس ورڈ میں کم از کم 8 حروف ہونا چاہیے، یہ صارف نام، یا عام طور پر استعمال ہونے والے پاس ورڈ سے ملتا جلتا نہیں ہو سکتا، اور مکمل طور پر عددی نہیں ہو سکتا۔')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='تصدیق کے لیے پہلے جیسا پاس ورڈ درج کریں۔')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_ur(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput) 

#zh
class SignupForm_zh(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='用户名 必填。 150 个字符或更少。 字母、数字和@。 仅+ - _。')
    email = forms.EmailField(max_length=200, help_text='电子邮件必填。')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='密码必须包含至少 8 个字符，不能类似于用户名或常用密码，并且不能完全是数字。')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='输入与之前相同的密码以进行验证。')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_zh(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)    

#zhhk
class SignupForm_zhhk(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='用户名 必填。 150 个字符或更少。 字母、数字和@。 仅+ - _。')
    email = forms.EmailField(max_length=200, help_text='电子邮件必填。')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='密码必须包含至少 8 个字符，不能类似于用户名或常用密码，并且不能完全是数字。')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='输入与之前相同的密码以进行验证。')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_zhhk(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)  

#zhsg
class SignupForm_zhsg(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='用户名 必填。 150 个字符或更少。 字母、数字和@。 仅+ - _。')
    email = forms.EmailField(max_length=200, help_text='电子邮件必填。')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='密码必须包含至少 8 个字符，不能类似于用户名或常用密码，并且不能完全是数字。')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='输入与之前相同的密码以进行验证。')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_zhsg(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)     

#zhtw
class SignupForm_zhtw(UserCreationForm):
    username = forms.CharField(max_length=200, help_text='用户名 必填。 150 个字符或更少。 字母、数字和@。 仅+ - _。')
    email = forms.EmailField(max_length=200, help_text='电子邮件必填。')
    password1 = forms.CharField(widget=forms.PasswordInput, help_text='密码必须包含至少 8 个字符，不能类似于用户名或常用密码，并且不能完全是数字。')
    password2 = forms.CharField(widget=forms.PasswordInput, help_text='输入与之前相同的密码以进行验证。')
  
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

class LoginForm_zhtw(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)                                 
       

    
                  






                        


           

