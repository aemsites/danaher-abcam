/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
    console.log(block, block.children);
    const timeline = [...block.children].map(element => {
        console.log(element);
        const timelineWrapper = document.createElement('div');
        const title = element.querySelector('h2');
        title.className = 'text-3xl mb-6 font-semibold text-heading-large font-header md:pt-20 md:-mt-20';
        timelineWrapper.append(title);
        const description = document.createElement('sub');
        const subtitle = element.children[1]?.querySelector('p');
        const subtitleFootnote = element.children[1]?.querySelector('ul');
        if (subtitle) {
            subtitle.className = `text-2xl mb-4 ${subtitleFootnote ? 'font-semibold': ''}`;
            description.appendChild(subtitle);
        }
        if (subtitleFootnote) {
            subtitleFootnote.className = 'text-lg trancking-wide list-disc list-inside mb-10 text-body-medium [&_li]:text-lg [&_li]:leading-9 [&_li]:tracking-wide [&_li]:text-slate-400';
            description.appendChild(subtitleFootnote);
        }
        const steps = element.querySelector('ol');
        if(steps) {
            [...steps.children].forEach((step, stepIndex) => {
                console.log(step);
                step.className = 'flex gap-x-4 mb-6';
                const stepIndexElement = document.createElement('h5');
                stepIndexElement.className = 'size-10 flex items-center text-lg p-3 border-2 border-black rounded-full';
                stepIndexElement.innerHTML = stepIndex + 1;
                const stepDivider = document.createElement('div');
                stepDivider.className = 'border border-gray-100';
                const stepContent = document.createElement('div');
                stepContent.className = 'py-2';
                const alert = step.querySelector('strong');
                stepContent.innerHTML = step.innerHTML;
                step.innerHTML = '';
                step.prepend(stepDivider);
                step.prepend(stepIndexElement);
                step.append(stepContent);

            });
            if (subtitle || subtitleFootnote) timelineWrapper.append(description);
            const stepEl = document.createElement('div');
            stepEl.className = 'text-2xl mb-6 font-semibold';
            stepEl.innerHTML = 'Steps';
            timelineWrapper.append(stepEl);
            timelineWrapper.append(steps);
        }
        return timelineWrapper;
    });
    console.log(timeline);
    block.innerHTML = '';
    timeline.forEach(element => {
        block.append(element);
    });
}