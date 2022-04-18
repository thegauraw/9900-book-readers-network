"""replace books table with book_details

Revision ID: 3a9fe02a9ccb
Revises: 97c3dab052ee
Create Date: 2022-03-27 10:20:45.837719

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3a9fe02a9ccb'
down_revision = '97c3dab052ee'
branch_labels = None
depends_on = None


def upgrade():
    # Fixing missing migration: drop existing table books and create another table book_details

    op.create_table('book_details',
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.Column('updated_on', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('volume_id', sa.String(length=20), nullable=True),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('average_rating', sa.Float(precision='10,1'), nullable=True),
    sa.Column('authors', sa.String(), nullable=True),
    sa.Column('smallThumbnail', sa.String(), nullable=True),
    sa.Column('categories', sa.String(), nullable=True),
    sa.Column('publisher', sa.String(), nullable=True),
    sa.Column('publishedDate', sa.String(length=20), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('volume_id')
    )

    op.drop_table('books')
    # FOLLOWING RAISING ERROR: `ERROR [flask_migrate] Error: No support for ALTER of constraints in SQLite dialect. Please refer to the batch mode feature which allows for SQLite migrations using a copy-and-move strategy.`
    # op.drop_constraint(None, 'collected_books', type_='foreignkey')
    # op.create_foreign_key(None, 'collected_books', 'book_details', ['book_id'], ['id'])

    # TEMPORARY SOLUTION: drop collected_books and recreate the table --> with foreign key constraint with new table 'book_details:
    op.drop_table('collected_books')
    op.create_table('collected_books',
    sa.Column('collection_id', sa.Integer(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['book_id'], ['book_details.id'], ),
    sa.ForeignKeyConstraint(['collection_id'], ['collections.id'], ),
    sa.PrimaryKeyConstraint('collection_id', 'book_id')
    )
    # ### end Alembic commands ###



def downgrade():
    # ### Fixing missing migration ###
    op.create_table('books',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('created_on', sa.DATETIME(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.Column('updated_on', sa.DATETIME(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.Column('title', sa.VARCHAR(length=120), nullable=False),
    sa.Column('authors', sa.VARCHAR(length=200), nullable=True),
    sa.Column('publisher', sa.VARCHAR(length=120), nullable=True),
    sa.Column('publication_date', sa.DATE(), nullable=True),
    sa.Column('category', sa.VARCHAR(length=80), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )

    op.drop_table('book_details')

    # FOLLOWING IS RAISING ERROR: `ERROR [flask_migrate] Error: No support for ALTER of constraints in SQLite dialect. Please refer to the batch mode feature which allows for SQLite migrations using a copy-and-move strategy.`
    # with op.batch_alter_table('collected_books', schema=None) as batch_op:
    #     # op.drop_constraint(None, 'collected_books', type_='foreignkey')
    #     op.create_foreign_key(None, 'collected_books', 'books', ['book_id'], ['id'])

    # TEMPORARY SOLUTION: drop collected_books and recreate the table --> with foreign key constrat with old table 'books':
    op.drop_table('collected_books')
    op.create_table('collected_books',
    sa.Column('collection_id', sa.Integer(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], ),
    sa.ForeignKeyConstraint(['collection_id'], ['collections.id'], ),
    sa.PrimaryKeyConstraint('collection_id', 'book_id')
    )
    
    # ### end Alembic commands ###
