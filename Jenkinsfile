pipeline {
  agent {
    docker {
      image 'cypress/included:15.10.0'
      args '--entrypoint=""'
    }
  }

  options { timestamps() }

  stages {
    stage('Install') {
      steps {
        sh 'node -v'
        sh 'npm -v'
        sh 'npm ci'
      }
    }

    stage('API Tests') {
      steps { sh 'npm run cy:api' }
      post {
        always {
          archiveArtifacts artifacts: 'cypress/videos/**,cypress/screenshots/**', allowEmptyArchive: true
        }
      }
    }

    stage('UI Tests') {
      steps { sh 'npm run cy:ui' }
      post {
        always {
          archiveArtifacts artifacts: 'cypress/videos/**,cypress/screenshots/**', allowEmptyArchive: true
        }
      }
    }
  }
}
