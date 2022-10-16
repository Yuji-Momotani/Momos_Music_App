#!/bin/sh

aws s3 rm s3://momosmusic/ --recursive
aws s3 cp dist s3://momosmusic/ --recursive