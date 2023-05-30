import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createReview(req: Request, res: Response) {
  const { review, user, movieId } = req.body;
  if (!review || !user || !movieId) {
    throw new Error('Por favor insira todos os valores.');
  }

  const newReview = await prisma.review.create({
    data: { review, user, movieId },
  });

  res.status(201).json({ review: newReview });
}

async function getMovieReviews(req: Request, res: Response) {
  const reviews = await prisma.review.findMany({
    where: {
      movieId: req.params.id,
    },
  });
  if (!reviews) {
    throw new Error('Ocorreu um erro ao procurar por avaliações...');
  }

  res.status(200).json({ reviews: reviews });
}

async function getSingleReview(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    throw new Error('Não foi possível encontrar essa avaliação...');
  }

  const review = await prisma.review.findUnique({
    where: {
      id: id,
    },
  });

  res.status(200).json({ review: review });
}

async function updateReview(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    throw new Error('Não foi possível encontrar essa avaliação...');
  }

  const { review, user } = req.body;

  const newReview = await prisma.review.update({
    where: {
      id: id,
    },
    data: {
      review,
      user,
    },
    select: { id: true, review: true, user: true, movieId: true },
  });

  res.status(200).json({ review: newReview });
}

async function deleteReview(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    throw new Error('Não foi possível encontrar essa avaliação...');
  }

  await prisma.review.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ msg: 'Avaliação removida com sucesso.' });
}

export { createReview, getMovieReviews, getSingleReview, updateReview, deleteReview };
