pipeline {
    agent any

    tools {
        nodejs "NodeJS 20"
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/cagininc/cypress-api-automation-framework.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                sh 'npx cypress run'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/screenshots/**', allowEmptyArchive: true
        }
    }
}
