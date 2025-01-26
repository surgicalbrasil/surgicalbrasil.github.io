// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);

// Create particles
const particleCount = 200;
const particles = new THREE.BufferGeometry();
const particlePositions = [];
const particleMaterials = [];

for (let i = 0; i < particleCount; i++) {
  const x = (Math.random() - 0.5) * 20;
  const y = (Math.random() - 0.5) * 20;
  const z = (Math.random() - 0.5) * 20;
  particlePositions.push(x, y, z);
}

// Set particle attributes
particles.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));
const particleMaterial = new THREE.PointsMaterial({
  color: 0x2A9D8F,
  size: 0.1,
});
const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

// Create lines between close particles
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x457B9D, transparent: true, opacity: 0.5 });
const lineGeometry = new THREE.BufferGeometry();
const linePositions = new Float32Array(particleCount * particleCount * 3); // Max possible lines
lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
scene.add(lineMesh);

camera.position.z = 8;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Update particles
  const positions = particles.attributes.position.array;
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i + 1] -= 0.01;
    if (positions[i + 1] < -10) {
      positions[i + 1] = 10;
    }
  }
  particles.attributes.position.needsUpdate = true;

  // Update lines between close particles
  let lineIndex = 0;
  for (let i = 0; i < particleCount; i++) {
    for (let j = i + 1; j < particleCount; j++) {
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (distance < 2) {
        linePositions[lineIndex++] = positions[i * 3];
        linePositions[lineIndex++] = positions[i * 3 + 1];
        linePositions[lineIndex++] = positions[i * 3 + 2];
        linePositions[lineIndex++] = positions[j * 3];
        linePositions[lineIndex++] = positions[j * 3 + 1];
        linePositions[lineIndex++] = positions[j * 3 + 2];
      }
    }
  }
  lineGeometry.setDrawRange(0, lineIndex / 3);
  lineGeometry.attributes.position.needsUpdate = true;

  renderer.render(scene, camera);
}

animate();

// Handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});




// Descentralized Storage
function initFullyConnectedNetwork() {
  const container = document.getElementById('canvas-storage');

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  // Nodes
  const nodeCount = 20; // Adjust for more or fewer nodes
  const nodes = [];
  const nodeGroup = new THREE.Group();
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x457B9D, transparent: true, opacity: 0.6 });

  // Create Nodes
  for (let i = 0; i < nodeCount; i++) {
    const geometry = new THREE.SphereGeometry(0.2, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0x2A9D8F });
    const node = new THREE.Mesh(geometry, material);
    node.position.set(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    );
    nodes.push(node);
    nodeGroup.add(node);
  }
  scene.add(nodeGroup);

  // Create Lines
  const lineGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(nodeCount * nodeCount * 3 * 2); // Max possible lines
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lineMesh);

  // Connect All Nodes
  function connectNodes() {
    let lineIndex = 0;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        positions[lineIndex++] = nodes[i].position.x;
        positions[lineIndex++] = nodes[i].position.y;
        positions[lineIndex++] = nodes[i].position.z;
        positions[lineIndex++] = nodes[j].position.x;
        positions[lineIndex++] = nodes[j].position.y;
        positions[lineIndex++] = nodes[j].position.z;
      }
    }
    lineGeometry.setDrawRange(0, lineIndex / 3);
    lineGeometry.attributes.position.needsUpdate = true;
  }
  connectNodes();

  // Animate Nodes
  camera.position.z = 10;
  function animate() {
    requestAnimationFrame(animate);

    // Rotate the network for visual effect
    nodeGroup.rotation.y += 0.002;
    lineMesh.rotation.y += 0.002;

    renderer.render(scene, camera);
  }
  animate();

  // Handle Window Resizing
  window.addEventListener('resize', () => {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
  });
}

// Initialize Animation
initFullyConnectedNetwork();





// Encryption
function initAutomaticEncryption() {
  const container = document.getElementById('canvas-encryption');

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  // Axes Helper (for clarity)
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // Points (Data Representation)
  const pointGeometry = new THREE.SphereGeometry(0.1, 16, 16);
  const pointMaterial = new THREE.MeshBasicMaterial({ color: 0x2A9D8F });
  const points = [];

  for (let i = 0; i < 20; i++) {
    const point = new THREE.Mesh(pointGeometry, pointMaterial);
    point.position.set(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    );
    scene.add(point);
    points.push(point);
  }

  // Encryption Matrix (3x3 Rotation and Scaling)
  const encryptionMatrix = new THREE.Matrix4();
  encryptionMatrix.set(
    1.2, 0.5, 0.2, 0,
    -0.3, 1.1, 0.4, 0,
    0.1, -0.5, 1.3, 0,
    0, 0, 0, 1
  );

  // Animation State
  let progress = 0;
  let isEncrypting = true; // Direction of animation

  // Function to Animate Points
  function animateTransformation() {
    progress += (isEncrypting ? 0.01 : -0.01); // Increment or decrement progress
    const lerpFactor = Math.min(Math.max(progress, 0), 1); // Clamp progress between 0 and 1

    points.forEach((point) => {
      const originalPosition = point.userData.original || point.position.clone();
      if (!point.userData.original) point.userData.original = originalPosition; // Save original position

      const targetPosition = originalPosition.clone().applyMatrix4(encryptionMatrix); // Transformed position

      // Interpolate between original and target position
      point.position.lerpVectors(originalPosition, targetPosition, lerpFactor);

      // Gradual color change
      point.material.color.lerp(new THREE.Color(isEncrypting ? 0xFFD700 : 0x2A9D8F), 0.05); // Gradual transition
    });

    // Reverse direction when reaching the end of the transformation
    if (progress >= 1) {
      isEncrypting = false;
    } else if (progress <= 0) {
      isEncrypting = true;
    }
  }

  // Continuous Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    animateTransformation(); // Animate the encryption transformation
    renderer.render(scene, camera);
  }

  // Camera Position
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0);

  // Start Animation
  animate();

  // Handle Window Resizing
  window.addEventListener('resize', () => {
    const { width, height } = container.getBoundingClientRect();
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
}

// Initialize Animation
initAutomaticEncryption();






// Sharing
function initSharingControlAnimation() {
  const container = document.getElementById('canvas-sharing');

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  // Central Node
  const centralNodeGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const centralNodeMaterial = new THREE.MeshBasicMaterial({ color: 0xFFD700 });
  const centralNode = new THREE.Mesh(centralNodeGeometry, centralNodeMaterial);
  scene.add(centralNode);

  // Surrounding Nodes
  const nodeCount = 20; // Total number of nodes
  const nodes = [];
  const nodeGroup = new THREE.Group();

  const surroundingNodeGeometry = new THREE.SphereGeometry(0.2, 16, 16);
  const surroundingNodeMaterial = new THREE.MeshBasicMaterial({ color: 0x2A9D8F });

  for (let i = 0; i < nodeCount; i++) {
    const node = new THREE.Mesh(surroundingNodeGeometry, surroundingNodeMaterial);
    const angle = (i / nodeCount) * Math.PI * 2; // Distribute nodes in a circle
    const radius = 5; // Distance from the central node
    node.position.set(
      radius * Math.cos(angle),
      0,
      radius * Math.sin(angle)
    );
    nodeGroup.add(node);
    nodes.push({ mesh: node, connected: false });
  }
  scene.add(nodeGroup);

  // Connections
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x457B9D });
  const connectionGroup = new THREE.Group();
  scene.add(connectionGroup);

  // Animate Connections
  let activeConnections = 0;

  function createConnection(node) {
    if (!node.connected) {
      const lineGeometry = new THREE.BufferGeometry();
      const points = new Float32Array([
        centralNode.position.x, centralNode.position.y, centralNode.position.z,
        node.mesh.position.x, node.mesh.position.y, node.mesh.position.z,
      ]);
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(points, 3));

      const line = new THREE.Line(lineGeometry, lineMaterial);
      connectionGroup.add(line);

      // Highlight the node
      node.mesh.material.color.set(0xE76F51); // Change to red
      setTimeout(() => {
        node.mesh.material.color.set(0x2A9D8F); // Reset to green
      }, 1000);

      node.connected = true;
    }
  }

  // Automatically Connect Nodes Sequentially
  function animateConnections() {
    if (activeConnections < nodes.length) {
      createConnection(nodes[activeConnections]);
      activeConnections++;
    } else {
      // Reset connections after a delay
      setTimeout(() => {
        connectionGroup.clear(); // Remove all connections
        nodes.forEach((node) => (node.connected = false));
        activeConnections = 0;
      }, 3000);
    }
  }

  // Camera Position
  camera.position.set(6, 6, 6);
  camera.lookAt(0, 0, 0);

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    // Rotate the surrounding nodes group
    nodeGroup.rotation.y += 0.002;

    // Trigger connections at intervals
    if (activeConnections < nodes.length && Math.random() < 0.02) {
      animateConnections();
    }

    renderer.render(scene, camera);
  }
  animate();

  // Handle Window Resizing
  window.addEventListener('resize', () => {
    const { width, height } = container.getBoundingClientRect();
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
}

// Initialize Animation
initSharingControlAnimation();



// FAQ
document.querySelectorAll('.faq-item button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    const isOpen = content.style.maxHeight;
    content.style.maxHeight = isOpen ? null : `${content.scrollHeight}px`;
    btn.querySelector('svg').classList.toggle('rotate-180');
  });
});



// Function to handle animations on scroll
function animateOnScroll(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate__animated', 'animate__fadeInUp');
      entry.target.classList.remove('opacity-0', 'translate-y-10');
      observer.unobserve(entry.target); // Stop observing after animation triggers
    }
  });
}

// Intersection Observer
const observer = new IntersectionObserver(animateOnScroll, {
  threshold: 0.2, // Trigger when 20% of the element is visible
});

// Select elements to animate
const elementsToAnimate = document.querySelectorAll('#solution-heading, #box-storage, #box-encryption, #box-sharing, #problem-video, #problem-box1, #problem-box2, #problem-box3');
elementsToAnimate.forEach(element => {
  observer.observe(element);
});

