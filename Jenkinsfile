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
    // Mantém relatórios e artifacts organizados
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
        sh '''
          set -eux
          if [ "${SUITE}" = "smoke" ]; then
            # Ajuste o spec path para onde você colocar seus smoke
            npx cypress run --spec "cypress/e2e/api/smoke/**/*.cy.js"
          else
            # Regressão API (tudo)
            npm run cy:api
          fi
        '''
      }
      post {
        always {
          // Publica JUnit (se existir)
          junit allowEmptyResults: true, testResults: 'cypress/results/*.xml'

          // Screenshots sempre (úteis em falha), vídeos só se falhar
          archiveArtifacts artifacts: 'cypress/screenshots/**,cypress/results/**', allowEmptyArchive: true
        }
        failure {
          archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: true
        }
      }
    }

    stage('UI Tests') {
      steps {
        sh '''
          set -eux
          if [ "${SUITE}" = "smoke" ]; then
            # Ajuste o spec path para onde você colocar seus smoke
            npx cypress run --spec "cypress/e2e/ui/smoke/**/*.cy.js"
          else
            # Regressão UI (tudo)
            npm run cy:ui
          fi
        '''
      }
      post {
        always {
          junit allowEmptyResults: true, testResults: 'cypress/results/*.xml'
          archiveArtifacts artifacts: 'cypress/screenshots/**,cypress/results/**', allowEmptyArchive: true
        }
        failure {
          archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: true
        }
      }
    }
  }

  post {
    always {
      // Limpa workspace no final (opcional, mas ajuda a não acumular lixo)
      cleanWs(deleteDirs: true, disableDeferredWipeout: true)
    }
  }
}
