const initialState = {
    documents: [
        {
            id: 1,
            text: 'rdsdpppp',
            versions: [
                {
                    id: 11,
                    text: '123',
                    tasks: [
                        {
                            id: 1,
                            text: 'dsdfs'
                        },
                        {
                            id: 2,
                            text: 'ddsfss'
                        },
                        {
                            id: 3,
                            text: 'sd'
                        }
                    ]
                },
                {
                    id: 21,
                    text: '1edsfc23',
                    tasks: [
                        {
                            id: 1,
                            text: 'dsdfs'
                        },
                        {
                            id: 2,
                            text: 'ddsfss'
                        },
                        {
                            id: 3,
                            text: 'sd'
                        }
                    ]
                }
            ]
        },
        {
            id: 22,
            text: 'rdsdgsgggdgsd'
        },
        {
            id: 32,
            text: 'rdsddsfadsgsdgsd'
        }
    ]
};

const content = (state = initialState) => {
    return state;
};

export default content;
