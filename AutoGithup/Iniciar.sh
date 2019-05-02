echo "Ingresa la accion que quieres hacer:"

url=`cut -f1 carpeta.txt`
cd "$url"


while :
do
read INPUT_STRING
case $INPUT_STRING in

iniciar)
	git init
	git add README.md

	;;

express)
	
 npm install express express-handlebars
	;;

commit)
	git status
	echo -n "Que archivos?: "; read archivos
	git add $archivos
	echo -n "Ingrese su commit: "; read commit
	git commit -m "$commit"

	;;
fusion)
	git branch
	echo -n "Con cual rama quiere fucionar la actual?: "; read rama
	git merge $rama

	;;
select)
	git branch
	echo -n "Digite la rama del proyecto a la que quiere ir: " ; read nuevarama
	git checkout $nuevarama

	;;
push)
	git push -u origin master

	;;
subirB)
	git branch
	echo -n "Cual rama quiere subir?: "; read rama
	git push -u origin $rama

	;;
enlazar)
	echo "ingresa tu url del repositorio, sino termina en .git colocalo"
	echo -n "url de proyecto: "; read url
	git remote add origin $url
	git push -u origin master

	;;
branch)
	echo -n "Nombre de su nuevo Brach: "; read nuevarama
	git branch $nuevarama
	git checkout $nuevarama

	;;
clonar)
	git clone $url

	;;
autor)
	echo -n "Cual es tu nombre?: "; read nombre
	echo -n "Cual es tu correo?: "; read correo
	git config --global user.name $nombre
	git config --global user.email $correo	

	;;
pull)
	git pull

	;;
cmd)
	echo "Ingrese tu comando:"
	read comando
	$comando
	;;
*)
	echo "Lo siento esa accion no esta en la linea de comandos"
;;
esac

echo "Listo. Que otra cosa?"

done