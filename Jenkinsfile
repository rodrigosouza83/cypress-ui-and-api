pipeline {
  agent {
    docker {
      image 'cypress/included:15.10.0'
      args '--entrypoint=""'
    }
  }

  options { timestamps() }

  parameters {
    choice(
      name: 'SUITE',
      choices: ['smoke', 'regression'],
      description: 'Qual suíte rodar? smoke (rápida) ou regression (completa)'
    )
  }

  environment {
    CYPRESS_RESULTS_DIR = 'cypress/results'
  }

  stages {
    stage('Install') {
      steps {
        sh 'node -v'
        sh 'npm -v'
        sh 'npm ci'
      }
    }

    stage('API Tests') {
      steps {
        sh """#!/bin/sh
          set -eux
          SUITE="${params.SUITE}"

          if [ "\$SUITE" = "smoke" ]; then
            npx cypress run --spec "cypress/e2e/api/smoke/**/*.cy.js"
          else
            npm run cy:api
          fi
        """
      }
      post {
        always {
          // Só vai publicar se você gerar XML no Cypress (por enquanto pode ficar vazio)
          junit allowEmptyResults: true, testResults: 'cypress/results/*.xml'

          // Sempre arquiva screenshots e results
          archiveArtifacts artifacts: 'cypress/screenshots/**,cypress/results/**', allowEmptyArchive: true
        }
        failure {
          // Vídeo só quando falhar
          archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: false
        }
      }
    }

    stage('UI Tests') {
      steps {
        sh """#!/bin/sh
          set -eux
          SUITE="${params.SUITE}"

          if [ "\$SUITE" = "smoke" ]; then
            npx cypress run --spec "cypress/e2e/ui/smoke/**/*.cy.js"
          else
            npm run cy:ui
          fi
        """
      }
      post {
        always {
          junit allowEmptyResults: true, testResults: 'cypress/results/*.xml'
          archiveArtifacts artifacts: 'cypress/screenshots/**,cypress/results/**', allowEmptyArchive: true
        }
        failure {
          archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: false
        }
      }
    }
  }

  post {
    always {
      cleanWs(deleteDirs: true, disableDeferredWipeout: true)
    }
  }
}
