function JobFormSectionHeader({ title }) {
  return (
    <div className="border-secondary border-l-[3px] pl-3">
      <span className="text-foreground text-sm font-bold uppercase tracking-wider">
        {title}
      </span>
    </div>
  );
}

export default JobFormSectionHeader;
