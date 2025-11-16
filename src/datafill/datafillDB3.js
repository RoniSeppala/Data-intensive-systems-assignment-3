import { SHARED_CONTENT, SHARED_USERS } from "./dataShared.js";

export default async function fillDataDB3(models) {
    const { User, Content, Subscription, Rating, WatchHistory } = models;

    await Promise.all([ //clears existing data
        User.deleteMany({}),
        Content.deleteMany({}),
        Subscription.deleteMany({}),
        Rating.deleteMany({}),
        WatchHistory.deleteMany({})
    ])

    const uniqueDB3Users = [
        { fullName: "DB3 User One", email: "db3_user1@example.com", city: "DB3City1" },
        { fullName: "DB3 User Two", email: "db3_user2@example.com", city: "DB3City2" },
        { fullName: "DB3 User Three", email: "db3_user3@example.com", city: "DB3City3" },
        { fullName: "DB3 User Four", email: "db3_user4@example.com", city: "DB3City4" },
        { fullName: "DB3 User Five", email: "db3_user5@example.com", city: "DB3City5" }
    ]

    const users = await User.insertMany([...SHARED_USERS, ...uniqueDB3Users]);

    const uniqueDB3Content = [
        { title: "DB3 Regional Movie 1", contentType: "movie", genre: "Regional", year: 2022, durationMin: 102, ageRating: "12" },
        { title: "DB3 Regional Movie 2", contentType: "movie", genre: "Regional", year: 2023, durationMin: 108, ageRating: "16" },
        { title: "DB3 Regional Series 1", contentType: "series", genre: "Regional", year: 2024, durationMin: 42, ageRating: "12" },
        { title: "DB3 Regional Series 2", contentType: "series", genre: "Regional", year: 2025, durationMin: 48, ageRating: "16" },
        { title: "DB3 Regional Movie 3", contentType: "movie", genre: "Regional", year: 2026, durationMin: 93, ageRating: "7" }
    ];

    const contents = await Content.insertMany([...SHARED_CONTENT, ...uniqueDB3Content]);

    let subscriptions = [];
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        subscriptions.push({
            userId: user._id,
            planName: i % 2 === 0 ? "premium" : "basic", // alternating plans
            pricePerMonth: i % 2 === 0 ? 15.99 : 9.99, // prices based on plan
            isActive: true,
            startDate: new Date(),
            endsAt: null
        });
    }
    await Subscription.insertMany(subscriptions);

    let ratings = [];
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const content = contents[i % contents.length]; // cycle through contents
        ratings.push({
            userId: user._id,
            contentId: content._id,
            liked: i % 2 === 0, // alternate likes
            comment: `This is a comment from ${user.fullName} on ${content.title}.`,
            ratedAt: new Date()
        });
    }
    await Rating.insertMany(ratings);

    let watchHistories = [];
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const content = contents[(i + 1) % contents.length]; // offset cycle through contents
        watchHistories.push({
            userId: user._id,
            contentId: content._id,
            startedAt: new Date(Date.now() - (i + 1) * 3600000), // started i+1 hours ago
            finishedAt: new Date(Date.now() - i * 1800000) // finished i*30 minutes ago
        });
    }
    await WatchHistory.insertMany(watchHistories);

    console.log("Database 3 filled with sample data.");
}