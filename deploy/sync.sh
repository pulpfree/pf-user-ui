#!/bin/sh

# Pulpfree Users Deploy for UI

# Commands
RSYNC="/usr/bin/rsync"
ECHO="/bin/echo"
PRT="/usr/bin/printf"
CD="/usr/bin/cd"

# Variables
SITEID="pf-user-ui"
HOST="ec2-user@pflabs.io"
REMOTEDIR="/var/www/Pulpfree/pf-user-ui/"
LOCALDIR="./build/"
KEYFILE="/Users/rondyck/.ssh/pulpfreekey.pem"
# RSYNC_CMD=$(rsync -rave \'ssh -i %s\' --delete %s %s:%s\n $KEYFILE $LOCALDIR $HOST $REMOTEDIR)
RSYNC_CMD=$(rsync -rave "ssh -i $KEYFILE" --delete $LOCALDIR $HOST:$REMOTEDIR)
SEP="======================================================"

$PRT "\033c"
$PRT "%s\n" $SEP
$PRT "\t%s\n" "-- Pulpfree Users UI Deploy --"
$PRT "%s\n" $SEP

$CD "../"
$PRT "stand by building...\n"
$ECHO `npm run build`
$CD "./deploy"
$PRT "\ndeploying...\n"
$ECHO $RSYNC_CMD

$PRT "%s\n" $SEP
$PRT "\t-- %s sync complete --\n" $SITEID
$PRT "\t-- %s --\n" "`/bin/date`"
$PRT "%s\n" $SEP