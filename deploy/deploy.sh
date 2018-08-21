echo "Creating the lambdas..."
stackName=PerfectIntern
release=1
bucketName=perfectintern.com
aws cloudformation deploy --stack-name $stackName \
    --template-file cloudformation.template.JSON \
    --tags \
        Name=Alec \
        ContactEmail=alech@iastate.edu \
        Release=$release \
    --parameter-overrides \
        BucketName=$bucketName \
    --no-fail-on-empty-changeset \
