import app from './app';

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`dockwatch-agent is running on port ${PORT}`);
});
