pipeline {
  agent any

  environment {
    AWS_REGION = "ap-southeast-1"
    ECR_REPO   = "744090694119.dkr.ecr.ap-south-1.amazonaws.com/automation"
    IMAGE_TAG  = "${BUILD_NUMBER}"
    EC2_HOST   = "18.143.199.74"
    CONTAINER_NAME = "automation-app"
  }

  stages {

    stage('Build Docker Image') {
      steps {
        sh """
          docker build -t automation-app:${IMAGE_TAG} .
        """
      }
    }

    stage('Login to AWS ECR') {
      steps {
        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'AKIA22P2C6HTY37FPZFS']]) {
          sh """
            aws ecr get-login-password --region ${AWS_REGION} \
            | docker login --username AWS --password-stdin ${ECR_REPO}
          """
        }
      }
    }

    stage('Tag & Push Image to ECR') {
      steps {
        sh """
          docker tag my-app:${IMAGE_TAG} ${ECR_REPO}:${IMAGE_TAG}
          docker push ${ECR_REPO}:${IMAGE_TAG}
        """
      }
    }

    stage('Deploy to EC2') {
      steps {
        sshagent(['ec2-ssh']) {
          sh """
            ssh -o StrictHostKeyChecking=no ubuntu@${EC2_HOST} '
              aws ecr get-login-password --region ${AWS_REGION} \
              | docker login --username AWS --password-stdin ${ECR_REPO}

              docker pull ${ECR_REPO}:${IMAGE_TAG}

              docker stop ${CONTAINER_NAME} || true
              docker rm ${CONTAINER_NAME} || true

              docker run -d \
                --name ${CONTAINER_NAME} \
                -p 80:3000 \
                ${ECR_REPO}:${IMAGE_TAG}
            '
          """
        }
      }
    }
  }

  post {
    success {
      echo "Deployment successful 🎉"
    }
    failure {
      echo "Deployment failed ❌"
    }
  }
}
