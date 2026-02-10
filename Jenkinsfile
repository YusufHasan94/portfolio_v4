pipeline {
  agent any

  environment {
    AWS_REGION = "ap-southeast-1"
    ECR_REPO   = "744090694119.dkr.ecr.ap-southeast-1.amazonaws.com/automation"
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
        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-creds']]) {
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
          docker tag automation-app:${IMAGE_TAG} ${ECR_REPO}:${IMAGE_TAG}
          docker push ${ECR_REPO}:${IMAGE_TAG}
        """
      }
    }

    stage('Deploy to EC2') {
      steps {
        sshagent(['ec2-ssh']) {
          sh """
          ssh -o StrictHostKeyChecking=no ubuntu@18.143.199.74 "\
          aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 744090694119.dkr.ecr.ap-southeast-1.amazonaws.com && \
          #docker pull 744090694119.dkr.ecr.ap-southeast-1.amazonaws.com/automation:22 && \
          #docker stop automation || true && \
          #docker rm automation || true && \
          #docker run -d --name automation -p 3000:3000 744090694119.dkr.ecr.ap-southeast-1.amazonaws.com/automation:22 \
          cd automation && docker compose up -d --build
          "
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
