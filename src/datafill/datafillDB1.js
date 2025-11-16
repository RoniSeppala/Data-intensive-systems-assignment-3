import { SHARED_CONTENT, SHARED_USERS } from "./dataShared.js";

export default async function fillDataDB1(models) {
    const { User, Content, Subscription, Rating, WatchHistory } = models;

    await Promise.all([ //clears existing data
        User.deleteMany({}),
        Content.deleteMany({}),
        Subscription.deleteMany({}),
        Rating.deleteMany({}),
        WatchHistory.deleteMany({})
    ])

    const uniqueDB1Users = [
        { fullName: "DB1 User One", email: "db1_user1@example.com", city: "DB1City1" },
        { fullName: "DB1 User Two", email: "db1_user2@example.com", city: "DB1City2" },
        { fullName: "DB1 User Three", email: "db1_user3@example.com", city: "DB1City3" },
        { fullName: "DB1 User Four", email: "db1_user4@example.com", city: "DB1City4" },
        { fullName: "DB1 User Five", email: "db1_user5@example.com", city: "DB1City5" }
    ]

    const users = await User.insertMany([...SHARED_USERS, ...uniqueDB1Users]);

    const uniqueDB1Content = [
        { title: "DB1 Movie A", contentType: "movie", genre: "Thriller", year: 2022, durationMin: 130, ageRating: "16" },
        { title: "DB1 Series B", contentType: "series", genre: "Fantasy", year: 2021, durationMin: 50, ageRating: "12" },
        { title: "DB1 Movie C", contentType: "movie", genre: "Animation", year: 2020, durationMin: 90, ageRating: "7" },
        { title: "DB1 Series D", contentType: "series", genre: "Documentary", year: 2019, durationMin: 40, ageRating: "All" },
        { title: "DB1 Movie E", contentType: "movie", genre: "Comedy", year: 2018, durationMin: 115, ageRating: "12" }
    ];

    const contents = await Content.insertMany([...SHARED_CONTENT, ...uniqueDB1Content]);

    const sharedSubscriptions = [
        { userId: null, planName: "Standard", pricePerMonth: 9.99, isActive: true },
        { userId: null, planName: "Premium", pricePerMonth: 14.99, isActive: true },
        { userId: null, planName: "Basic", pricePerMonth: 5.99, isActive: false },
        { userId: null, planName: "Standard", pricePerMonth: 9.99, isActive: true },
        { userId: null, planName: "Premium", pricePerMonth: 14.99, isActive: false }
    ];

    let subscriptions = [];
    for (let i = 0; i < users.length; i++) {
        if (i < 5) {
            const sub = { ...sharedSubscriptions[i] };
            sub.userId = users[i]._id;
            subscriptions.push(sub);
            continue;
        }
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

    const sharedRatings = [
        { userId: null, contentId: null, liked: true, comment: "Loved it!" },
        { userId: null, contentId: null, liked: true, comment: "Pretty good." },
        { userId: null, contentId: null, liked: false, comment: "Not my style." },
        { userId: null, contentId: null, liked: true, comment: "Great series." },
        { userId: null, contentId: null, liked: false, comment: "Too scary." }
    ];

    let ratings = [];
    for (let i = 0; i < users.length; i++) {
        if (i < 5) {
            const rate = { ...sharedRatings[i] };
            rate.userId = users[i]._id;
            rate.contentId = contents[i]._id;
            ratings.push(rate);
            continue;
        }
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

    const now = new Date("2020-01-01T12:00:00Z"); //same time for all timestanps
    const oneHour = 3600000; // milliseconds in one hour

    const sharedWatchHistory = [
        { userId: null, contentId: null, startedAt: new Date(now.getTime() - oneHour * 10), finishedAt: new Date(now.getTime() - oneHour * 9) },
        { userId: null, contentId: null, startedAt: new Date(now.getTime() - oneHour * 8), finishedAt: new Date(now.getTime() - oneHour * 7) },
        { userId: null, contentId: null, startedAt: new Date(now.getTime() - oneHour * 6), finishedAt: new Date(now.getTime() - oneHour * 5) },
        { userId: null, contentId: null, startedAt: new Date(now.getTime() - oneHour * 4), finishedAt: new Date(now.getTime() - oneHour * 3) },
        { userId: null, contentId: null, startedAt: new Date(now.getTime() - oneHour * 2), finishedAt: new Date(now.getTime() - oneHour * 1) }
    ];

    let watchHistories = [];
    for (let i = 0; i < users.length; i++) {
        if (i < 5) {
            const wh = { ...sharedWatchHistory[i] };
            wh.userId = users[i]._id;
            wh.contentId = contents[i]._id;
            watchHistories.push(wh);
            continue;
        }
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

    console.log("Database 1 filled with sample data.");
}