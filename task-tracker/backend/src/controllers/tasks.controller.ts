import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const createTaskSchema = z.object({
  title: z.string().min(1, 'Titolo richiesto').max(255),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  status: z.enum(['todo', 'in_progress', 'completed', 'archived']).default('todo'),
  dueDate: z.string().datetime().optional(),
  projectId: z.string().uuid().optional(),
});

const updateTaskSchema = createTaskSchema.partial();

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, priority, projectId, search } = req.query;
    
    const where: any = { userId: req.userId };
    
    if (status) where.status = status as string;
    if (priority) where.priority = priority as string;
    if (projectId) where.projectId = projectId as string;
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }
    
    const tasks = await prisma.task.findMany({
      where,
      include: {
        project: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    
    res.json(tasks);
  } catch (error) {
    throw error;
  }
};

export const getTaskById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: req.userId,
      },
      include: {
        project: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
    
    if (!task) {
      res.status(404).json({ error: 'Task non trovato' });
      return;
    }
    
    res.json(task);
  } catch (error) {
    throw error;
  }
};

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const data = createTaskSchema.parse(req.body);
    
    const task = await prisma.task.create({
      data: {
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        userId: req.userId!,
      },
      include: {
        project: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
    
    res.status(201).json(task);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
      return;
    }
    throw error;
  }
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = updateTaskSchema.parse(req.body);
    
    // Check if task exists and belongs to user
    const existingTask = await prisma.task.findFirst({
      where: { id, userId: req.userId },
    });
    
    if (!existingTask) {
      res.status(404).json({ error: 'Task non trovato' });
      return;
    }
    
    const task = await prisma.task.update({
      where: { id },
      data: {
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      },
      include: {
        project: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
    
    res.json(task);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
      return;
    }
    throw error;
  }
};

export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Check if task exists and belongs to user
    const existingTask = await prisma.task.findFirst({
      where: { id, userId: req.userId },
    });
    
    if (!existingTask) {
      res.status(404).json({ error: 'Task non trovato' });
      return;
    }
    
    await prisma.task.delete({ where: { id } });
    
    res.status(204).send();
  } catch (error) {
    throw error;
  }
};

export const updateTaskStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = z.object({
      status: z.enum(['todo', 'in_progress', 'completed', 'archived']),
    }).parse(req.body);
    
    // Check if task exists and belongs to user
    const existingTask = await prisma.task.findFirst({
      where: { id, userId: req.userId },
    });
    
    if (!existingTask) {
      res.status(404).json({ error: 'Task non trovato' });
      return;
    }
    
    const task = await prisma.task.update({
      where: { id },
      data: {
        status,
        completedAt: status === 'completed' ? new Date() : null,
      },
      include: {
        project: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
    
    res.json(task);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
      return;
    }
    throw error;
  }
};
