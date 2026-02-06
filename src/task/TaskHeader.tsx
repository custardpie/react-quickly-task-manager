import type { SyntheticEvent } from "react";

export interface TaskHeaderProps {
    title: string;
    isEditing: boolean;
    draftTitle: string;
    onDraftTitleChange: (nextTitle: string) => void;
    onSave: () => void;
    onCancel: () => void;
}

function TaskHeader({
    title,
    isEditing,
    draftTitle,
    onDraftTitleChange,
    onSave,
    onCancel,
}: Readonly<TaskHeaderProps>) {
    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave();
    };

    return (
        <header className="card-header">
            {isEditing ? (
                <form className="card-title-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={draftTitle}
                        onChange={(e) => onDraftTitleChange(e.target.value)}
                        autoFocus
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={onCancel}>
                        Cancel
                    </button>
                </form>
            ) : (
                <p className="card-title">{title}</p>
            )}
        </header>
    );
}

export default TaskHeader;