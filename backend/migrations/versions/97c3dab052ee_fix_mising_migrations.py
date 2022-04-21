"""fix missing migrations

Revision ID: 97c3dab052ee
Revises: e8e4b9cd9bff
Create Date: 2022-04-17 09:25:15.400857

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '97c3dab052ee'
down_revision = 'e8e4b9cd9bff'
branch_labels = None
depends_on = None


def upgrade():
    # ###
    #   FOLLLOWING MIGRATIONS WERE MISSING WHEN I TRIED TO GENERATE EVENTS, 
    #     I HAVE TRIED TO ORGANISE THEM INTO THEIR OWN MIGRATION FILES:
    #       * current file (fix)
    #       * replace books table with book_details
    #       * create table readings
    #       * create table achievements
    #       * create table goals
    #   PLEASE REMEMBER: Any changes you make to db-models (not just create table but for any changes) 
    #       * RUN: `flask db migrate -m "CHANGE DETAILS"`
    #       * RUN: `flask db upgrade`
    # ###
    # op.create_table('book_details',
    # sa.Column('created_on', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    # sa.Column('updated_on', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    # sa.Column('id', sa.Integer(), nullable=False),
    # sa.Column('volume_id', sa.String(length=20), nullable=True),
    # sa.Column('title', sa.String(), nullable=True),
    # sa.Column('average_rating', sa.Float(precision='10,1'), nullable=True),
    # sa.Column('authors', sa.String(), nullable=True),
    # sa.Column('smallThumbnail', sa.String(), nullable=True),
    # sa.Column('categories', sa.String(), nullable=True),
    # sa.Column('publisher', sa.String(), nullable=True),
    # sa.Column('publishedDate', sa.String(length=20), nullable=True),
    # sa.PrimaryKeyConstraint('id'),
    # sa.UniqueConstraint('volume_id')
    # )
    # op.create_table('achievements',
    # sa.Column('created_on', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    # sa.Column('updated_on', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    # sa.Column('id', sa.Integer(), nullable=False),
    # sa.Column('image', sa.String(length=20), nullable=True),
    # sa.Column('description', sa.String(), nullable=True),
    # sa.Column('reader_id', sa.Integer(), nullable=False),
    # sa.ForeignKeyConstraint(['reader_id'], ['readers.id'], ),
    # sa.PrimaryKeyConstraint('id'),
    # sa.UniqueConstraint('image')
    # )
    # op.create_table('goals',
    # sa.Column('id', sa.Integer(), nullable=False),
    # sa.Column('userid', sa.String(length=80), nullable=False),
    # sa.Column('month', sa.String(length=10), nullable=False),
    # sa.Column('goal_num', sa.Integer(), nullable=False),
    # sa.ForeignKeyConstraint(['userid'], ['readers.id'], ),
    # sa.PrimaryKeyConstraint('id')
    # )
    # op.create_table('readings',
    # sa.Column('created_on', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    # sa.Column('updated_on', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    # sa.Column('id', sa.Integer(), nullable=False),
    # sa.Column('volume_id', sa.String(length=20), nullable=False),
    # sa.Column('reader_id', sa.Integer(), nullable=False),
    # sa.Column('rating', sa.Float(precision=2), nullable=True),
    # sa.Column('review', sa.Text(), nullable=True),
    # sa.Column('last_update_review_rating_at', sa.DateTime(timezone=True), nullable=True),
    # sa.Column('has_read', sa.Boolean(), nullable=True),
    # sa.Column('last_update_read_at', sa.Date(), nullable=True),
    # sa.ForeignKeyConstraint(['reader_id'], ['readers.id'], ),
    # sa.ForeignKeyConstraint(['volume_id'], ['book_details.volume_id'], ),
    # sa.PrimaryKeyConstraint('id')
    # )
    # op.drop_table('books')
    # op.drop_constraint(None, 'collected_books', type_='foreignkey')
    # op.create_foreign_key(None, 'collected_books', 'book_details', ['book_id'], ['id'])

    #  ******************************************************************************** NOTE ********************************************************************************
    #  **********************************************************************************************************************************************************************
    # THIS OPERATION RESULTED IN THE FOLLOWING ERROR for sqlite database:
    # """ERROR [flask_migrate] Error: No support for ALTER of constraints in SQLite dialect. Please refer to the batch mode feature which allows for SQLite migrations using a copy-and-move strategy."""
    # using `with op.batch_alter_table('readers', schema=None) as batch_op:` also didn't help
    # So as a solution, going back to original migration of the readers to add constraint and drop columns

    # with op.batch_alter_table('readers', schema=None) as batch_op:
    #     op.create_unique_constraint(None, 'readers', ['email'])
    #     op.create_unique_constraint(None, 'readers', ['username'])
    #     op.drop_column('readers', 'lastname')
    #     op.drop_column('readers', 'firstname')
    
    print ('temporarily skipping this migration because it raised an error in SQLite DB, As a solution: fixing the migration file of create table readers: try dropping the database and running: `flask db migrate`')

    # ### end Alembic commands ###


def downgrade():
    # ### NOTE: only readers table related changes are here... remaining changes are in the following migration files as mentioned in `upgrade()` ###
    #  ******************************************************************************** NOTE ********************************************************************************
    #  **********************************************************************************************************************************************************************
    # # RAISED AN ERROR: `ERROR [flask_migrate] Error: No support for ALTER of constraints in SQLite dialect. Please refer to the batch mode feature which allows for SQLite migrations using a copy-and-move strategy.`
    # with op.batch_alter_table('readers', schema=None) as batch_op:
    #     op.add_column('readers', sa.Column('firstname', sa.TEXT(length=80), nullable=True))
    #     op.add_column('readers', sa.Column('lastname', sa.TEXT(length=80), nullable=True))
    #     op.drop_constraint(None, 'readers', type_='unique')
    #     op.drop_constraint(None, 'readers', type_='unique')
    print ('temporarily skipping this migration because it raised an error in SQLite DB, As a solution: fixing the migration file of create table readers: try dropping the database and running: `flask db migrate`')

    # # op.drop_constraint(None, 'collected_books', type_='foreignkey')
    # # op.create_foreign_key(None, 'collected_books', 'books', ['book_id'], ['id'])
    # # op.create_table('books',
    # # sa.Column('id', sa.INTEGER(), nullable=False),
    # # sa.Column('created_on', sa.DATETIME(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    # # sa.Column('updated_on', sa.DATETIME(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    # # sa.Column('title', sa.VARCHAR(length=120), nullable=False),
    # # sa.Column('authors', sa.VARCHAR(length=200), nullable=True),
    # # sa.Column('publisher', sa.VARCHAR(length=120), nullable=True),
    # # sa.Column('publication_date', sa.DATE(), nullable=True),
    # # sa.Column('category', sa.VARCHAR(length=80), nullable=True),
    # # sa.PrimaryKeyConstraint('id')
    # # )

    # # op.drop_table('readings')
    # # op.drop_table('goals')
    # # op.drop_table('achievements')
    # # op.drop_table('book_details')
    # ### end Alembic commands ###
