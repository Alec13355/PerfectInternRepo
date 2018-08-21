#!/bin/bash

aws iam create-role --role-name basic-lambda-execution-role \
--assume-role-policy-document file://Lambda_execution.JSON \

aws iam create-policy --policy-name basic-lambda-execution-managed-policy \
--policy-document file://policy.JSON \

aws iam attach-role-policy --role-name basic-lambda-execution-role \
--policy-arn arn:aws:iam::774253983446:policy/basic-lambda-execution-managed-policy \
