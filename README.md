<ifModule mod_gzip.c>
mod_gzip_on Yes
mod_gzip_dechunk Yes
mod_gzip_item_include file .(html?|txt|css|js|php|pl)$
mod_gzip_item_include handler ^cgi-script$
mod_gzip_item_include mime ^text/.*
mod_gzip_item_include mime ^application/x-javascript.*
mod_gzip_item_exclude mime ^image/.*
mod_gzip_item_exclude rspheader ^Content-Encoding:.*gzip.*
</ifModule>

##Tweaks##
Header set X-Frame-Options SAMEORIGIN

## EXPIRES CACHING ##
<IfModule mod_expires.c>
ExpiresActive On
ExpiresByType image/jpg "access 1 year"
ExpiresByType image/jpeg "access 1 year"
ExpiresByType image/gif "access 1 year"
ExpiresByType image/png "access 1 year"
ExpiresByType text/css "access 1 month"
ExpiresByType text/html "access 1 month"
ExpiresByType application/pdf "access 1 month"
ExpiresByType text/x-javascript "access 1 month"
ExpiresByType application/x-shockwave-flash "access 1 month"
ExpiresByType image/x-icon "access 1 year"
ExpiresDefault "access 1 month"
</IfModule>
## EXPIRES CACHING ##

<IfModule mod_headers.c>
    Header set Connection keep-alive
    <filesmatch "\.(ico|flv|gif|swf|eot|woff|otf|ttf|svg)$">
        Header set Cache-Control "max-age=2592000, public"
    </filesmatch>
    <filesmatch "\.(jpg|jpeg|png|webp)$">
        Header set Cache-Control "max-age=1209600, public"
    </filesmatch>
    # css and js should use private for proxy caching https://developers.google.com/speed/docs/best-practices/caching#LeverageProxyCaching
    <filesmatch "\.(css)$">
        Header set Cache-Control "max-age=31536000, private"
    </filesmatch>
    <filesmatch "\.(js)$">
        Header set Cache-Control "max-age=1209600, private"
    </filesmatch>
    <filesMatch "\.(x?html?|php)$">
        Header set Cache-Control "max-age=600, private, must-revalidate"
      </filesMatch>
</IfModule>