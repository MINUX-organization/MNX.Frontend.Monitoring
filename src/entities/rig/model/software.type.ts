import { z } from "zod";

export const SoftwareSchema = z.object({
  minuxVersion: z.string({invalid_type_error: 'Minux version must be a string'}),
  linuxVersion: z.string({invalid_type_error: 'Linux version must be a string'}),
  amdGpuDriverVersion: z.string({invalid_type_error: 'AMD gpu driver version must be a string'}),
  nvidiaGpuDriverVersion: z.string({invalid_type_error: 'Nvidia gpu driver version must be a string'}),
  intelGpuDriverVersion: z.string({invalid_type_error: 'Intel gpu driver version must be a string'}),
  openCLVersion: z.string({invalid_type_error: 'OpenCL version must be a string'}),
  cudaVersion: z.string({invalid_type_error: 'Cuda version must be a string'}),
  agentVersion: z.string({invalid_type_error: 'Agent version must be a string'}),
  hardwareManagerVersion: z.string({invalid_type_error: 'Hardware manager version must be a string'}),
  miners: z.record(z.string({invalid_type_error: 'Miners must be a string'}))
})
export type SoftwareType = z.infer<typeof SoftwareSchema>