// ==========================================================
// NODE.JS OS MODULE - SYSTEM INFORMATION
// ==========================================================
//
// Purpose:
// This program demonstrates how Node.js communicates with
// the operating system using the built-in "os" module.
//
// The application collects information about:
// - Operating system
// - Platform
// - CPU architecture
// - Host machine name
// - OS release version
// - CPU cores
// - Memory information
//
// Mental Model:
//
// JavaScript Application
//          |
//          ↓
//      Node.js Runtime
//          |
//          ↓
//       OS Module
//          |
//          ↓
// Operating System + Hardware
//
// ==========================================================

// ----------------------------------------------------------
// Import Node.js built-in OS module
// ----------------------------------------------------------
//
// The "os" module is included inside Node.js.
// No npm installation is required.
//
// This gives access to operating system information.
//
import os from "os";

// ----------------------------------------------------------
// Collect system information
// ----------------------------------------------------------
//
// Instead of printing values randomly,
// the application creates a structured object.
//
// This is closer to professional backend development.
//
// Later this object could become:
// - API response
// - Monitoring data
// - Database record
// - Server health report
//
const systemInformation = {
  // Operating system name
  // Example:
  // Linux
  // Windows_NT
  // Darwin
  operatingSystem: os.type(),

  // Platform identifier provided by Node.js
  // Example:
  // linux
  // win32
  // darwin
  platform: os.platform(),

  // CPU architecture
  // Example:
  // x64
  // arm64
  architecture: os.arch(),

  // Computer hostname
  // The unique name of this machine
  hostname: os.hostname(),

  // Operating system release version
  release: os.release(),

  // Number of available CPU cores
  //
  // Example:
  // 8 cores = 8 logical workers
  //
  // Useful for:
  // - task processing
  // - worker threads
  // - AI workloads
  cpuCores: os.cpus().length,

  // Total installed memory in bytes
  //
  // Node.js returns memory values in bytes.
  // Conversion to GB will happen later.
  totalMemory: os.totalmem(),

  // Currently available free memory in bytes
  //
  // Important for:
  // - AI processing
  // - large file processing
  // - preventing crashes
  freeMemory: os.freemem(),
};

// ----------------------------------------------------------
// Convert bytes into readable GB format
// ----------------------------------------------------------
//
// Computers store memory using bytes.
//
// Example:
//
// 17179869184 bytes
//
// becomes:
//
// 16 GB
//
// Formula:
// bytes / 1024 / 1024 / 1024
//
const memoryInGB = {
  total: (systemInformation.totalMemory / 1024 / 1024 / 1024).toFixed(2),

  free: (systemInformation.freeMemory / 1024 / 1024 / 1024).toFixed(2),
};

// ----------------------------------------------------------
// Display system report
// ----------------------------------------------------------
//
// A clean report is easier for humans to read.
//
// In production systems,
// this information could instead be sent to:
// - logging service
// - monitoring dashboard
// - API endpoint
//
console.log(`
==================================
 SYSTEM INFORMATION
==================================

Operating System:
${systemInformation.operatingSystem}

Platform:
${systemInformation.platform}

Architecture:
${systemInformation.architecture}

Hostname:
${systemInformation.hostname}

Release:
${systemInformation.release}

CPU Cores:
${systemInformation.cpuCores}

Total Memory:
${memoryInGB.total} GB

Free Memory:
${memoryInGB.free} GB

==================================
`);
