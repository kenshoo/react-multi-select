function isBreakingChange(commit) {
	return commit.message.toLowerCase().includes('breaking changes');
}

module.exports = function (pluginConfig, {commits}, callback) {
	const breakingChanges = commits.some((commit) => isBreakingChange(commit));

	callback(null, breakingChanges ? 'minor' : 'patch');
};