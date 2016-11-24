#!/bin/sh

SENCHADIR="~/bin/Sencha/Cmd/6.1.2.15"

GITDIR="~/git/geoext3app.git"
INTDIR="~/apps/SppAppClassic"
WEBDIR="/var/lib/tomcat7/webapps"
ROUTE="test" # e.g. test or ROOT

echo "git checkout"
git --work-tree=$INTDIR --git-dir=$GITDIR checkout -f

echo "build using sencha cmd"
cd $INTDIR
$SENCHADIR/sencha app build

echo "remove old app folder"
rm -r $WEBDIR/$ROUTE

echo "copy build to tomcat"
cp -r $INTDIR/build/production/SppAppClassic $WEBDIR/SppAppClassic

echo "rename app to fit requested path"
mv SppAppClassic $ROUTE
