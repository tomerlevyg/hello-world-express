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
            curl localhost:8999 | grep "Hello From Docker" || echo "Test Failed Exiting" && exit 2
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
          docker tag docker push 770039027395.dkr.ecr.eu-west-2.amazonaws.com/${SERVICENAME}:${BUILD_NUMBER}-sandbox docker push 770039027395.dkr.ecr.eu-west-2.amazonaws.com/${SERVICENAME}:latest
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