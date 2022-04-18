"""create table events

Revision ID: 2243f7758867
Revises: a7e483aecd3d
Create Date: 2022-04-17 18:25:59.488007

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2243f7758867'
down_revision = 'a7e483aecd3d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.Column('updated_on', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.Column('title', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=120), nullable=True),
    sa.Column('venue', sa.String(length=120), nullable=True),
    sa.Column('date_and_time', sa.DateTime(), nullable=False),
    sa.Column('seats', sa.Integer(), nullable=True),
    sa.Column('status', sa.Boolean(), nullable=True),
    sa.Column('organised_by', sa.Integer(), nullable=False),
    sa.Column('related_book', sa.String(length=20), nullable=False),
    sa.ForeignKeyConstraint(['organised_by'], ['readers.id'], ),
    sa.ForeignKeyConstraint(['related_book'], ['book_details.volume_id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('events')
    # ### end Alembic commands ###
