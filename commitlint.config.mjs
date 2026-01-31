export default {
    parserPreset: {
        parserOpts: {
            headerPattern: /^(\w+):\s#(\w+)\s(.*)$/,
            headerCorrespondence: ['type', 'scope', 'subject'],
        },
    },
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'Feature',
                'Fix',
                'Hotfix',
                'Improvement',
                'Docs',
                'Style',
                'Refactor',
                'Test',
                'Chore',
                'Revert',
            ],
        ],
        'type-case': [2, 'always', 'pascal-case'], // Enforce PascalCase for type
        'scope-enum': [
            2,
            'always',
            ['common', 'web', 'mobile', 'server', 'desktop', 'core'],
        ],
        'subject-empty': [2, 'never'],
        'header-max-length': [2, 'always', 100],
    },
};
