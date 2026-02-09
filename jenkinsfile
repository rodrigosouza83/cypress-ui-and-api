pipeline {
  agent any

  options { timestamps() }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install') {
      steps {
        sh 'node -v || true'
        sh 'npm -v || true'
        sh 'npm ci'
      }
    }

    stage('API Tests') {
      steps {
        sh 'npm run cy:run:api'
      }
      post {
        always {
          archiveArtifacts artifacts: 'cypress/videos/**,cypress/screenshots/**', allowEmptyArchive: true
        }
      }
    }

    stage('UI Tests') {
      steps {
        sh 'npm run cy:run:ui'
      }
      post {
        always {
          archiveArtifacts artifacts: 'cypress/videos/**,cypress/screenshots/**', allowEmptyArchive: true
        }
      }
    }
  }
}
