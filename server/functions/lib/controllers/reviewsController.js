"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.getSingleReview = exports.getMovieReviews = exports.createReview = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function createReview(req, res) {
    const { review, user, movieId } = req.body;
    if (!review || !user || !movieId) {
        throw new Error('Por favor insira todos os valores.');
    }
    const newReview = await prisma.review.create({
        data: { review, user, movieId },
    });
    res.status(201).json({ review: newReview });
}
exports.createReview = createReview;
async function getMovieReviews(req, res) {
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
exports.getMovieReviews = getMovieReviews;
async function getSingleReview(req, res) {
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
exports.getSingleReview = getSingleReview;
async function updateReview(req, res) {
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
exports.updateReview = updateReview;
async function deleteReview(req, res) {
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
exports.deleteReview = deleteReview;
//# sourceMappingURL=reviewsController.js.map