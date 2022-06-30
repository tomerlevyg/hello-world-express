pipeline {
    triggers {
        pollSCM 'H/2 * * * *'
      }
  agent any
    environment {
        SERVICENAME = 'hello1'
    }  
  stages {
      stage('Run Tests Sandbox') {
        when {
          branch 'sandbox'
      }
        steps {
          script {
            sh '''
            aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 770039027395.dkr.ecr.eu-west-2.amazonaws.com
            docker build -t 770039027395.dkr.ecr.eu-west-2.amazonaws.com/${SERVICENAME}:${BUILD_NUMBER}-sandbox .
            docker run -d -p 8999:80 --name test-container 770039027395.dkr.ecr.eu-west-2.amazonaws.com/${SERVICENAME}:${BUILD_NUMBER}-sandbox
            sleep 2
            curl localhost:8999 | grep "Hello From Docker" || exit 2 & echo "Test Failed Exiting"
            docker rm -f test-container
            '''
          }

        }
      }
      stage('Build&Push') {
        when {
          branch 'sandbox'
      }
        steps {
          sh '''
          docker push 770039027395.dkr.ecr.eu-west-2.amazonaws.com/${SERVICENAME}:${BUILD_NUMBER}-sandbox
          docker tag 770039027395.dkr.ecr.eu-west-2.amazonaws.com/${SERVICENAME}:${BUILD_NUMBER}-sandbox 770039027395.dkr.ecr.eu-west-2.amazonaws.com/${SERVICENAME}:latest
          docker push 770039027395.dkr.ecr.eu-west-2.amazonaws.com/${SERVICENAME}:latest
            '''
        }
      }
      stage('Deploy to ECS') {
        when {
          branch 'sandbox'
      }
        steps {
          sh '''
            echo "Will Deploy"
            '''
        }
      }    
    }
  }
