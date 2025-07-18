node {
  stage('Checkout') {
    echo '📥 Checking out code...'
    checkout scm
  }

  stage('Install Dependencies') {
    echo '📦 Installing dependencies...'
    sh 'npm ci'
    echo '🛠️ Installing Cypress...'
    sh 'npx cypress install'
  }

  stage('Run Cypress Tests') {
    echo '🧪 Running Cypress tests...'
    sh 'npx cypress run'
  }

  stage('Archive Results') {
    echo '📂 Archiving results...'
    junit 'cypress/results/*.xml'
    archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', fingerprint: true
  }
}
